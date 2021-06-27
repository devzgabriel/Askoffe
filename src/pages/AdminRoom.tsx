import cx from 'classnames'
import { Fragment, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import answerImg from '../assets/images/answer.svg'
import checkImg from '../assets/images/check.svg'
import deleteImg from '../assets/images/delete.svg'
import logoImg from '../assets/images/logo.svg'
import secLogoImg from '../assets/images/secLogo.svg'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { ThemeSwitch } from '../components/ThemeSwitch'
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { useTheme } from '../hooks/useTheme'
import { database } from '../services/firebase'
import '../styles/room.scss'

type RoomParams = {
  id: string
}

export function AdminRoom() {
  const { user } = useAuth()
  const { isDark } = useTheme()
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomId = params.id

  const [modalId, setModalId] = useState<string | null>(null)

  const { title, questions } = useRoom(roomId)

  useEffect(() => {
    // if (!user) {
    //   history.push('/')
    // }
  }, [user, history])

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    setModalId(null)
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  return (
    <div id='page-room' className={cx({ dark: isDark })}>
      <header>
        <div className='content'>
          <button onClick={() => history.push('/')}>
            {isDark ? (
              <img src={secLogoImg} alt='Askoffe' />
            ) : (
              <img src={logoImg} alt='Askoffe' />
            )}
          </button>
          <div>
            <div className='commands'>
              <RoomCode code={roomId} classNames={cx({ dark: isDark })} />
              <Button
                isOutlined
                onClick={handleEndRoom}
                classNames={cx({ dark: isDark })}
              >
                Encerrar sala
              </Button>
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className='question-list'>
          {questions.map((question) => {
            return (
              <Fragment key={question.id}>
                <Question
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                  classNames={cx({ dark: isDark })}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type='button'
                        onClick={() =>
                          handleCheckQuestionAsAnswered(question.id)
                        }
                      >
                        <img
                          src={checkImg}
                          alt='Marcar pergunta como respondida'
                        />
                      </button>
                      <button
                        type='button'
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt='Dar destaque à pergunta' />
                      </button>
                    </>
                  )}
                  <button type='button' onClick={() => setModalId(question.id)}>
                    <img src={deleteImg} alt='Remover pergunta' />
                  </button>
                </Question>
                <Modal
                  id={modalId}
                  onConfirm={handleDeleteQuestion}
                  onRequestClose={() => setModalId(null)}
                  onCancel={() => setModalId(null)}
                  description='Tem certeza que você deseja excluir esta pergunta?'
                  classNames={cx({ dark: isDark })}
                />
              </Fragment>
            )
          })}
        </div>
      </main>
    </div>
  )
}

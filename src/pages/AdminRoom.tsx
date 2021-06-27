import { useEffect, useState, Fragment } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import answerImg from '../assets/images/answer.svg'
import checkImg from '../assets/images/check.svg'
import deleteImg from '../assets/images/delete.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import '../styles/room.scss'
import { Modal } from '../components/Modal'

type RoomParams = {
  id: string
}

export function AdminRoom() {
  const { user } = useAuth()
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomId = params.id

  const [isModalOpen, setIsModalOpen] = useState(false)

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
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
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
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='Askoffe' />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
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
                  <button type='button' onClick={() => setIsModalOpen(true)}>
                    <img src={deleteImg} alt='Remover pergunta' />
                  </button>
                </Question>
                <Modal
                  isOpen={isModalOpen}
                  onConfirm={() => handleDeleteQuestion(question.id)}
                  onRequestClose={() => setIsModalOpen(false)}
                  onCancel={() => setIsModalOpen(false)}
                  description='Tem certeza que você deseja excluir esta pergunta?'
                />
              </Fragment>
            )
          })}
        </div>
      </main>
    </div>
  )
}

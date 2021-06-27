import cx from 'classnames'
import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import backWordsImg from '../assets/images/backWords.svg'
import logoImg from '../assets/images/logo100.svg'
import secLogoImg from '../assets/images/secLogo100.svg'
import { Button } from '../components/Button'
import { ThemeSwitch } from '../components/ThemeSwitch'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import { database } from '../services/firebase'
import '../styles/auth.scss'

export function NewRoom() {
  const { user } = useAuth()
  const { isDark } = useTheme()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if (newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id='page-auth'>
      <aside>
        <img
          src={backWordsImg}
          alt='Ilustração simbolizando perguntas e respostas'
        />
        <p>Por Gabriel Silva</p>
      </aside>
      <main>
        <div className='themeSwitch'>
          <ThemeSwitch />
        </div>
        <div className='main-content'>
          {isDark ? (
            <img src={secLogoImg} alt='Askoffe' />
          ) : (
            <img src={logoImg} alt='Askoffe' />
          )}
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Nome da sala'
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type='submit' classNames={cx({ dark: isDark })}>
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to='/'>clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

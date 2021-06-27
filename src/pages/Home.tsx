import cx from 'classnames'
import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import backWordsImg from '../assets/images/backWords.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import logoImg from '../assets/images/logo100.svg'
import secLogoImg from '../assets/images/secLogo100.svg'
import { Button } from '../components/Button'
import { ThemeSwitch } from '../components/ThemeSwitch'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import { database } from '../services/firebase'
import '../styles/auth.scss'

export function Home() {
  const { isDark } = useTheme()
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (!user) {
      await signInWithGoogle()
    }

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert('Room does not exists.')
      return
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed.')
      return
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id='page-auth' className={cx({ dark: isDark })}>
      <aside className={cx({ dark: isDark })}>
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
          <button onClick={handleCreateRoom} className='create-room'>
            <img src={googleIconImg} alt='Logo do Google' />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button classNames={cx({ dark: isDark })} type='submit'>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

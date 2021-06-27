import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
  code: string
  classNames?: string
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button
      className={`room-code ${props.classNames}`}
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        <img src={copyImg} alt='Copy room code' />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}

import ModalRM from 'react-modal'
import deleteImg from '../../assets/images/delete.svg'
import './styles.scss'
import '../../styles/button.scss'

interface ModalProps {
  description: string
  onConfirm: () => void
  onCancel: () => void
  onRequestClose: () => void
  isOpen: boolean
}

export function Modal({
  onConfirm,
  isOpen,
  description,
  onRequestClose,
  onCancel,
}: ModalProps) {
  return (
    <ModalRM
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className='modal-content'
      overlayClassName='overlay'
    >
      <div className='details'>
        <img src={deleteImg} alt='Modal Icon' />
        <p>{description}</p>
      </div>
      <div className='buttons'>
        <button className='button outlined' onClick={onCancel}>
          Cancelar
        </button>
        <button className='alert button' onClick={onConfirm}>
          Deletar
        </button>
      </div>
    </ModalRM>
  )
}

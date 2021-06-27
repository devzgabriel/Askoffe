import ModalRM from 'react-modal'
import deleteImg from '../../assets/images/delete.svg'
import './styles.scss'
import '../../styles/button.scss'

interface ModalProps {
  id: string | null
  description: string
  onConfirm: (id: string) => Promise<void>
  onCancel: () => void
  onRequestClose: () => void
}

export function Modal({
  id,
  onConfirm,
  description,
  onRequestClose,
  onCancel,
}: ModalProps) {
  return (
    <ModalRM
      isOpen={!!id}
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
        {id && (
          <button className='alert button' onClick={() => onConfirm(id)}>
            Deletar
          </button>
        )}
      </div>
    </ModalRM>
  )
}

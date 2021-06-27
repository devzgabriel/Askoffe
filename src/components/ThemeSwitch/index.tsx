import Switch from 'react-switch'
import { Moon } from '../../assets/icons/Moon'
import { Sun } from '../../assets/icons/Sun'
import { useTheme } from '../../hooks/useTheme'

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={() => toggleTheme()}
      handleDiameter={28}
      offColor='transparent'
      onColor='#transparent'
      offHandleColor='#transparent'
      onHandleColor='#transparent'
      height={40}
      width={70}
      borderRadius={8}
      uncheckedIcon={<></>}
      checkedIcon={<></>}
      uncheckedHandleIcon={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Sun />
        </div>
      }
      checkedHandleIcon={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Moon />
        </div>
      }
      className='react-switch'
      id='small-radius-switch'
    />
  )
}

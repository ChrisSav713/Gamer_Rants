import { useTheme } from '../hooks/useTheme'
import {
  PaintBrushIcon,
  LightBulbIcon,
  MoonIcon
} from '@heroicons/react/24/solid'
// styles
import './ThemeSelector.css'

const themeColors = ['#58249c', '#249c6b', '#b70233']

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme()

  const toggleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark')
  }
  console.log(mode)
  return (
    <div className='theme-selector'>
      <div className='mode-toggle'>
        <img
          onClick={toggleMode}
          src='https://www.w3schools.com/images/lamp.jpg'
          style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
          alt='dark/light toggle icon'
        />
      </div>
      <div className='theme-buttons'>
        <>
          <PaintBrushIcon className='h-6 w-6' />
          {themeColors.map((color) => (
            <div
              key={color}
              onClick={() => changeColor(color)}
              style={{ background: color }}
            />
          ))}
        </>
      </div>
    </div>
  )
}

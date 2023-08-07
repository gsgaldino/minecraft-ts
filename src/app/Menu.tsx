import './Menu.css'

interface MenuProps {
  isActive?: boolean;
}

export const Menu = ({ isActive }: MenuProps) => {
  return (
    <div className={`menu__container ${isActive && 'active'}`}>
      <div className='menu__background'>
        <button className='menu__button'>Resume</button>
      </div>
    </div>
  )
}

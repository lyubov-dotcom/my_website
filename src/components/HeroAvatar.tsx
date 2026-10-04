import '../HeroAvatar.css'

const photo = `${import.meta.env.BASE_URL}avatar/lyubov-pose-smile.webp`

function HeroAvatar() {
  return (
    <div className="hero-avatar-stage hero-avatar-stage--splash">
      <img className="hero-avatar-photo" src={photo} alt="Любовь Чуйко" />
    </div>
  )
}

export default HeroAvatar

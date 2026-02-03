interface GridCardProps {
  icon: React.ReactNode
  title: string
  description?: string
  link?: string
}

export default function HomeGridCard({ icon, title, description, link }: GridCardProps) {
  const handleClick = () => {
    if (link) {
      window.location.href = link
    }
  }

  return (
    <div 
      className="grid-card"
      onClick={link ? handleClick : undefined}
      style={{ cursor: link ? 'pointer' : 'default' }}
    >
      <div className="grid-card-icon">
        {icon}
      </div>
      <h3 className="grid-card-title">{title}</h3>
      {description && <p className="grid-card-description">{description}</p>}
    </div>
  )
}

//data structure 
/*

interface GridCardData {
  _key: string,
  description?: string
}
  
*/

interface GridCardProps {
  icon: React.ReactNode
  description?: string
  link?: string
}

export default function HomeGridCard({ icon, description, link }: GridCardProps) {
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
      {description && <p className="grid-card-description">{description}</p>}
    </div>
  )
}

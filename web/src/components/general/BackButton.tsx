import { Link } from 'react-router-dom'
import '../../styles/BackButton.css'

type BackButtonProps = {
    to: string
    label?: string
}

export default function BackButton({ to, label = 'Back' }: BackButtonProps) {
    return (
        <Link className="back-button" to={to} aria-label={label}>
            <svg
                className="back-button-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    d="M14 7l-5 5 5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <span className="back-button-label">{label}</span>
        </Link>
    )
}
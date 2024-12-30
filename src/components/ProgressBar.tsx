import React from 'react'

interface ProgressBarProps {
    stage: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ stage }) => {
    const getColor = () => {
        switch (stage) {
            case 0:
                return 'transparent'
            case 1:
                return 'red'
            case 2:
                return 'yellow'
            case 3:
                return 'green'
            default:
                return 'green'
        }
    }

    const getWidht = () => {
        switch (stage) {
            case 0:
                return '0%'
            case 1:
                return '33%'
            case 2:
                return '66%'
            case 3:
                return '100%'
            default:
                return '100%'
        }
    }

    return (
        <div className='progressBarContainer'>
            <div className='progressBar' style={{width: getWidht() , backgroundColor: getColor(), transition: '.3s' }}></div>
        </div>
    )
}

export default ProgressBar;
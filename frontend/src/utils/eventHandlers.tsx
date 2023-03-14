import React from 'react'

export const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setEmail: React.Dispatch<React.SetStateAction<string>>
) => {
    setEmail(e.target.value)
}

export const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPassword: React.Dispatch<React.SetStateAction<string>>
) => {
    setPassword(e.target.value)
}

export const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setRepeatPassword: React.Dispatch<React.SetStateAction<string>>
) => {
    setRepeatPassword(e.target.value)
}


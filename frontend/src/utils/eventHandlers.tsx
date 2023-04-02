import React from 'react'

export const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setEmail: React.Dispatch<React.SetStateAction<string>>
) => {
    setEmail(e.target.value)
}

export const handleUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setUsername: React.Dispatch<React.SetStateAction<string>>
) => {
    setUsername(e.target.value)
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

export const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>
) => {
    setImage(e.target.value)
}

export const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setName: React.Dispatch<React.SetStateAction<string>>
) => {
    setName(e.target.value)
}

export const handleChangeText = (
    e: React.ChangeEvent<HTMLInputElement>,
    setName: React.Dispatch<React.SetStateAction<string>>
) => {
    setName(e.target.value)
}
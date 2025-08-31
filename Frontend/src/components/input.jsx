import { useState } from "react"
import { EyeIcon, ViewOffSlashIcon } from "hugeicons-react"
const TextInput = ({ name, label, value, placeholder, onChange, icon, type = 'text', isRequired = true }, props) => {
    return (
        <>
            <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm mb-2 font-dosisMedium" htmlFor={name}>
                    {label}
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden px-2">
                    {icon}
                    <input
                        className="w-full px-3 py-2 outline-none font-dosisRegular bg-transparent"

                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={isRequired}
                        id={name}
                        {...props}
                    />
                </div>
            </div>
        </>
    )
}

const MultiLineText = ({ name, label, value, placeholder, onChange, icon, type = 'text', isRequired = true }, props) => {

    return (
        <>
            <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm mb-2 font-dosisMedium" htmlFor={name}>
                    {label}
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden px-2">
                    {icon}
                    <textarea
                        className="w-full px-3 py-2 outline-none font-dosisRegular bg-transparent"

                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={isRequired}
                        id={name}
                        {...props}
                    />
                </div>
            </div>
        </>
    )
}


const PasswordTextInput = ({ name, label, value, placeholder, onChange, icon, isRequired = true }) => {

    const [isPassword, setIsPassword] = useState(true)

    const handleChange = () => {
        setIsPassword(!isPassword)
    }
    return (
        <>
            <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2 font-dosisMedium" htmlFor={name}>
                    {label}
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden px-2">
                    {icon}
                    {/* <span className="px-3 text-gray-600">
                    <img src="/icons/email.svg" alt="Email Icon" />
                </span> */}
                    <input
                        className="w-full px-3 py-2 outline-none font-dosisRegular text-[16px] bg-transparent"
                        type={isPassword === true ? 'password' : 'text'}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={isRequired}
                        id={name}
                    />
                    {isPassword === true ? <ViewOffSlashIcon color="#000" onClick={handleChange} /> : <EyeIcon color="#000" onClick={handleChange} />}
                </div>
            </div>
        </>
    )
}

export { TextInput, PasswordTextInput, MultiLineText }
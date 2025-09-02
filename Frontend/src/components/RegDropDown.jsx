import { useEffect, useRef, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function RegDropDown({
    label = 'Dropdown',
    DropDownItems,
    onChangeFunction,
    re,
    name,
    firstValue,
    isRequired = false,
    textColor = 'text-white',
    className = '',
    readOnly = false,
    placeholder,
    icon
}) {
    const [dropDownItems, setDropDownItems] = useState([])
    const [dropValue, setDropValue] = useState(null)

    const dropdownRef = useRef(null)

    if (firstValue?.label) {
        DropDownItems = DropDownItems?.filter((e) => e?.label !== firstValue?.label)
    }

    useEffect(() => {
        if (firstValue) {
            setDropValue(firstValue)
        }
    }, [firstValue])

    if (!DropDownItems?.length) return null

    return (
        <>
            <div className={`font-dosisMedium flex flex-col space-y-1  ${className} w-full`}>
                <label htmlFor="" className={`font-medium ${textColor} text-[13px]`}>
                    {label}{' '}
                    {isRequired && label != '' && <span className="text-red-500">*</span>}
                </label>
                <Select className="w-full" name={name} onValueChange={onChangeFunction} required>
                    <SelectTrigger className='w-full border-pink-400/40  text-white'>
                        <SelectValue placeholder={placeholder} className="text-white" />
                    </SelectTrigger>
                    <SelectContent className="!bg-black !text-white border border-pink-400/40">
                        {DropDownItems?.map((ele, index) => (
                            <SelectItem
                                key={index}
                                value={ele?.value}
                                className="!bg-gray-900 !text-gray-100 hover:!bg-pink-700 hover:!text-black hover:!font-bold"
                            >
                                {ele?.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {/* <Select
                    onChange={(value) => {
                        setDropValue(value)
                        if (onChangeFunction) {
                            onChangeFunction({
                                target: {
                                    value,
                                },
                            })
                        }
                    }}
                    label={''}
                    name={name}
                    placeholder="Pick one"
                    searchable
                    nothingFound="No options"
                    value={dropValue}
                    data={[{ value: '', label: '--------' }, ...DropDownItems]}
                    required={isRequired}
                    readOnly={readOnly}
                /> */}
            </div>
        </>
    )
}

export { RegDropDown }
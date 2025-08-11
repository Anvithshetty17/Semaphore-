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

function DropDown({
    label = 'Dropdown',
    DropDownItems,
    onChangeFunction,
    re,
    name,
    firstValue,
    isRequired = false,
    textColor = 'text-gray-600',
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
            <div className={`font-dosisMedium flex flex-col space-y-1 ${className} w-full`}>
                <label htmlFor="" className={`font-medium ${textColor} text-[13px]`}>
                    {label}{' '}
                    {isRequired && label != '' && <span className="text-red-500">*</span>}
                </label>
                <Select className="w-full" name={name} onValueChange={onChangeFunction} required>
                    <SelectTrigger className='w-full border' >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent  >
                        {DropDownItems?.map((ele, index) => {
                            return (
                                <SelectItem key={index} value={ele?.value} > {ele?.label} </SelectItem>
                            )
                        })}
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

export { DropDown }
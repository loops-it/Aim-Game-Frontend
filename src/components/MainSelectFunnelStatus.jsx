import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export default function MainSelectFunnelStatus({ options, label, placeholder, value, onChange, disabled, variant }) {
    const [query, setQuery] = useState('')


    const isOptionDisabled = (option) => {
        if (value && option.order < value.order) {
            return true;
        }
        return false;
    };

    if (!value && options.some(option => option.status === 'List')) {
        value = options.find(option => option.status === 'List')
    }
    const filteredOptions =
        query === ''
            ? options
            : options.filter((option) =>
                option.status
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    const getHeight = () => {
        if(variant == "small"){
            return "h-[35px]"
        }
        if(variant == "medium"){
            return "h-[40px]"
        }
        return "h-[48px]"
    }

    return (
        <div className="relative">
            <label className='text-app-blue-2 font-normal text-sm lg:text-base' >{label}</label>
            <Combobox disabled={disabled} value={value} onChange={onChange}>
                <div className="relative mt-2">
                    <div className={`relative w-full cursor-default border border-app-gray overflow-hidden rounded-lg ${disabled ? "bg-[#FAFAFA]" : "bg-white"}  text-lef sm:text-sm`}>
                        <Combobox.Input
                            placeholder={placeholder}
                            className={`w-full border-none ${getHeight()} outline-none pl-3 pr-10 text-sm lg:text-base leading-5 text-gray-900 bg-transparent`}
                            displayValue={(option) => option.status}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        {/* <Combobox.Options className="z-20 absolute shadow-lg border mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-black/5 focus:outline-none sm:text-sm">
                            
                            {filteredOptions.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <Combobox.Option
                                        key={option.status}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-app-blue text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={option}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {option.status}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-app-blue'
                                                            }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options> */}

<Combobox.Options className="z-20 absolute shadow-lg border mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-black/5 focus:outline-none sm:text-sm">
                            {filteredOptions.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <Combobox.Option
                                        key={option.status}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-app-blue text-white' : 'text-gray-900'
                                            } ${isOptionDisabled(option) ? 'opacity-50 cursor-not-allowed' : ''}`
                                        }
                                        value={option}
                                        disabled={isOptionDisabled(option)}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {option.status}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-app-blue'
                                                            }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

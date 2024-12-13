/* eslint-disable react/prop-types */
import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Chip } from '@mui/material'

export default function MainMultipleSelectTasks({ options, label, placeholder, onDeleteItem, value = [], onChange, disabled }) {
    const [query, setQuery] = useState('');

    const filteredOptions = query === ''
        ? options
        : options.filter((option) =>
            option.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

    const handleOnChange = (selectedItems) => {
        onChange(selectedItems);
    };

    return (
        <div className="">
            <label className='text-app-blue-2 font-normal text-sm lg:text-base' >{label}</label>
            <Combobox
                disabled={disabled}
                value={value}
                onChange={(selectedItems) => handleOnChange(selectedItems)}
                multiple
            >
                <div className="relative mt-2">
                    <div className={`relative w-full cursor-default border border-app-gray rounded-lg ${disabled ? "bg-[#FAFAFA]" : "bg-white"} text-lef sm:text-sm`}>
                        <Combobox.Input
                            placeholder={placeholder}
                            className="w-full border-none min-h-[48px] outline-none pl-3 pr-10 text-sm lg:text-base leading-5 text-gray-900 bg-transparent"
                            displayValue={(option) => option.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    {value.length > 0 && (

                        <div className='flex flex-wrap gap-1 my-3'>
                            {value.map((optionId, index) => {
                                const selectedOption = options.find(option => option._id === optionId);
                                console.log("chip : ", selectedOption);

                                return (
                                    <Chip
                                        key={optionId}
                                        label={selectedOption ? selectedOption.name : 'Unknown'}
                                        onDelete={() => onDeleteItem(index)}
                                    />
                                );
                            })}
                        </div>
                    )}
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="z-20 absolute shadow-lg border mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-black/5 focus:outline-none sm:text-sm">
                            {filteredOptions.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <Combobox.Option
                                        key={option._id}
                                        value={option._id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-app-blue text-white' : 'text-gray-900'
                                            }`
                                        }
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {option.name}
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
    );
}
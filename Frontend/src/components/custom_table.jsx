const CustomTable = ({
  children,
  rows,
  centerIndex = [],
  endIndex = [],
  doubleWidth = [],
  className = '',
  printHiddenIndex = [],
  theadClassName,
}) => {
  return (
    <>
      <div
        className={`relative z- overflow-x-auto overflow-y-auto border font-dosisMedium rounded-md p-1 ${className}`}
      >
        <table
          className={`w-full text-[14px] text-left text-gray-500 overflow-y-visible`}
        >
          <thead
            className={`text-[13px] text-gray-700 uppercase bg-gray-200  rounded-lg ${theadClassName}`}
          >
            <tr>
              {rows?.map((ele, index) => {
                return (
                  <>
                    <th
                      scope="col"
                      className={` ${centerIndex?.includes(index)
                        ? 'text-center'
                        : endIndex?.includes(index)
                          ? 'text-end'
                          : 'text-start'
                        } p-2 w-min border-r border-white ${doubleWidth?.includes(index) ? 'w-[30%]' : 'w-min'
                        } ${printHiddenIndex?.includes(index) ? 'print:hidden' : ''
                        }`}
                    >
                      {ele}
                    </th>
                  </>
                )
              })}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  )
}

export { CustomTable }
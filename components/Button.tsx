export const OneButton = ({
  handleClick,
  text
}: {
  handleClick: React.MouseEventHandler,
  text: string
}) => {
  return (
    <div className="flex justify-center absolute bottom-4 w-full">
      <button
        className="bg-sky-600 rounded-lg text-white p-2"
        onClick={handleClick}
      >{text}</button>
    </div>
  )
}

export const TwoButtons = ({
  handleClickBack,
  handleClickForward,
  textBack,
  textForward
}: {
  handleClickBack: React.MouseEventHandler,
  handleClickForward: React.MouseEventHandler
  textBack: string,
  textForward: string
}) => {
  return (
    <div className="flex justify-between absolute bottom-4 w-full px-4">
      <button
        className="bg-gray-400 rounded-lg text-white p-2"
        onClick={handleClickBack}
      >{textBack}</button>
      <button
        className="bg-sky-600 rounded-lg text-white p-2"
        onClick={handleClickForward}
      >{textForward}</button>
    </div>
  )
}

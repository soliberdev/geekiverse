export const UserMessage = ({ parts }) => {
  return (
    <div className="self-end text-end p-2 text-white border border-white min-w-fit max-w-[70%] rounded-lg rounded-br-none">
        {parts.map((part, i) => (
            part.type === 'text' && <p key={i}>{part.text}</p>
        ))}
    </div>
  )
}

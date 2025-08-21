import { UIMessagePart } from "ai";

type MessageProps = {
  parts: UIMessagePart<any, any>[];
};

export const AiMessage = ({ parts }: MessageProps) => {
  return (
    <div className="self-start text-start p-2 text-white border border-white min-w-fit max-w-[75%] rounded-lg rounded-bl-none">
        {parts.map((part, i) => (
            part.type === 'text' && <p key={i}>{part.text}</p>
        ))}
    </div>
  )
};

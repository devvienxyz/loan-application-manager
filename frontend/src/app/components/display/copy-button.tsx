export default function CopyButton({ text }: { text: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log("Text copied to clipboard:", text);
      })
      .catch((err) => {
        console.error("Failed to copy text:", err);
      });
  };

  return (
    <button
      type="button"
      className="group relative -mr-2 ml-2 hidden size-9 items-center justify-center sm:flex"
      title="Copy to clipboard"
      onClick={handleCopy}>
      <svg
        className="mb-1.5 size-5 transition duration-150 stroke-gray-400 group-hover:stroke-gray-950"
        fill="none"
        viewBox="0 0 20 20"
        strokeWidth="1"
        strokeLinecap="round" strokeLinejoin="round">
        <path strokeLinecap="round" d="M12.5 6.5V6a.5.5 0 0 0-.5-.5H8a.5.5 0 0 0-.5.5v.5m5 0V7a.5.5 0 0 1-.5.5H8a.5.5 0 0 1-.5-.5v-.5m5 0H14A1.5 1.5 0 0 1 15.5 8v9a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 17V8A1.5 1.5 0 0 1 6 6.5h1.5m0 5h5m-5 3h5"></path>
        <path className="opacity-0" strokeLinecap="round" d="M10 .5v2m-3.536-.536L7.88 3.38m5.657-1.415L12.12 3.38"></path>
      </svg>
    </button>
  );
};
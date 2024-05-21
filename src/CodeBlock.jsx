import { CopyBlock } from "react-code-blocks";

function CodeBlockComp(props) {
  const { text, language, showLineNumbers } = props;
  return (
    <CopyBlock
      text={text}
      language={language}
      showLineNumbers={showLineNumbers}
      wrapLines
    />
  );
}
export default CodeBlockComp;

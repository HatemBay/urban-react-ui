import { Textarea } from "@chakra-ui/react";
import { useState } from "react";
interface Props {
  onChange: (e: any) => void;
}

const DefinitionTextArea = ({ onChange }: Props) => {
  const [visualDefinition, setVisualDefinition] = useState("");

  //TODO: set conditions for each language and add conditions that would change the style of the text
  const handleDefinition = (e: any) => {
    const text = e.target.value;
    // Make the text between two instances of ** bold then change from html to string
    const boldText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // We don't want to show the user html elements in the definition so we will return a visual version of the text
    onChange(text);
    setVisualDefinition(boldText);
  };

  return (
    <Textarea
      value={visualDefinition}
      id="content"
      pr={5}
      placeholder="Type your definition here..."
      onChange={handleDefinition}
    ></Textarea>
  );
};

export default DefinitionTextArea;

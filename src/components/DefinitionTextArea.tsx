import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { Language } from "../data/types";
interface Props {
  language: Language;
  onChange: (e: any) => void;
}

const DefinitionTextArea = ({ language, onChange }: Props) => {
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
    <>
      <FormControl>
        <FormLabel>
          Define your word in <b>{language}</b>
        </FormLabel>
        <Textarea
          value={visualDefinition}
          id="content"
          pr={5}
          placeholder="Type your definition here..."
          onChange={handleDefinition}
        ></Textarea>
      </FormControl>
    </>
  );
};

export default DefinitionTextArea;

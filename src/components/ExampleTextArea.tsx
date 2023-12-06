import { Box, FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { Language } from "../data/types";
import "./richTextEditor/richTextEditorStyles.css";

interface Props {
  language: Language;
  onChange: (e: any) => void;
}

const ExampleTextArea = ({ language, onChange }: Props) => {
  const [visualExample, setVisualExample] = useState("");

  //TODO: set conditions for each language and add conditions that would change the style of the text
  const handleExample = (e: any) => {
    const text = e.target.value;
    //make the text between two instances of ** bold then change from html to string
    const boldText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // We don't want to show the user html elements in the example so we will return a visual version of the text
    onChange(text);
    setVisualExample(boldText);
  };

  return (
    <>
      <FormControl>
        <Textarea
          value={visualExample}
          id="content"
          pr={5}
          placeholder="Type an example of how it's used in a sentence..."
          onChange={handleExample}
        ></Textarea>
      </FormControl>
    </>
  );
};

export default ExampleTextArea;

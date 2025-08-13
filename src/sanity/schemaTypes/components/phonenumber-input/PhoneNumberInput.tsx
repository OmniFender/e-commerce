import PhoneInput from "react-phone-input-2";

import { StringInputProps, PatchEvent, set } from "sanity";

import "./phonenumber-input.css";
import "react-phone-input-2/lib/style.css";

function PhoneNumberInput(props: StringInputProps) {
  const handleChange = (value: string) => {
    props.onChange(PatchEvent.from(set(value)));
  };

  return (
    <>
      <PhoneInput
        country={"eg"}
        value={props.value}
        onChange={handleChange}
        inputClass="input"
        buttonClass="button"
        dropdownClass="dropdown"
      />
    </>
  );
}

export default PhoneNumberInput;

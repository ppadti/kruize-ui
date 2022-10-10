import React, { useState, useEffect } from "react";
import {
  Slider,
  Text,
  Form,
  FormGroup,
  TextInput,
  FormSelect,
  FormSelectOption,
  Radio,
  TextVariants,
  TextContent,
  Grid
} from "@patternfly/react-core";
import { Link } from "react-router-dom";
import PencilAltIcon from '@patternfly/react-icons/dist/esm/icons/pencil-alt-icon';
import SaveIcon from "@patternfly/react-icons/dist/esm/icons/save-icon";
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { MathComponent } from "mathjax-react";

const Throughput_details = (props: { data; setData }) => {

  const [valueContinuous1, setValueContinious1] = useState(props.data["THweightage"]);
  const [inputValueContinuous1, setInputValueContinuous1] = useState(props.data["THweightage"]);
  const [query, setQuery] = useState(props.data["THquery"]);
  const [valueType, setValueType] = useState(props.data["THvaluetype"]);
  const [option, setOption] = useState(props.data["THdatasource"]);
  const [operatorOption, setOperatorOption] = useState(props.data["THoperator"]);
  const [editing, setEditing] = useState(false);
  const [direction, setDirection] = useState<'min' | 'max'>(props.data["THdirection"]);
  const [equation, setEquation] = useState(props.data["THequation"]);

  const onChangeContinuous1 = (value, inputValue, setLocalInputValue) => {
    let newValue;
    if (inputValue === undefined) {
      newValue = Math.floor(value);
    } else {
      if (inputValue > 100) {
        newValue = 100;
        setLocalInputValue(100);
      } else if (inputValue < 0) {
        newValue = 0;
        setLocalInputValue(0);
      }
      else {
        newValue = Math.floor(inputValue);
      }
    }
    setInputValueContinuous1(newValue);
    setValueContinious1(newValue);
    sessionStorage.setItem("Throughput Slider Value", newValue);
  };

  const handleQueryChange = (query: string) => {
    setQuery(query);
  };
  useEffect(() => {
    props.setData({ ...{ ...props.data }, THdirection: direction })
  }, [direction])
  useEffect(() => {
    props.setData({ ...{ ...props.data }, THquery: query })
  }, [query])
  useEffect(() => {
    props.setData({ ...{ ...props.data }, THvaluetype: valueType })

  }, [valueType])
  useEffect(() => {
    props.setData({ ...{ ...props.data }, THdatasource: option })

  }, [option])
  useEffect(() => {
    props.setData({ ...{ ...props.data }, THoperator: operatorOption })

  }, [operatorOption])
  useEffect(() => {
    props.setData({ ...{ ...props.data }, THequation: equation })
  }, [equation])

  useEffect(() => {
    var a;
    if (operatorOption === '2' && direction === 'min') {
      console.log(1, operatorOption)
      a = valueContinuous1 / 100 + String.raw`\frac{1}{throughput^2}`
      //setEquation(`${valueContinuous1/100} frac(1)(throughput^2)` )
      //min
    }
    else if (operatorOption === '2' && direction === 'max') {
      console.log(2, operatorOption)
      a = valueContinuous1 / 100 + String.raw`throughput^2`
      //max
    }
    else if (operatorOption === '0.5' && direction === 'min') {
      console.log(3, operatorOption)
      a = valueContinuous1 / 100 + String.raw`\frac{1}{throughput^(0.5)}`
    }
    else if (operatorOption === '0.5' && direction === 'max') {
      console.log(4, operatorOption)
      a = valueContinuous1 / 100 + String.raw`throughput^0.5`
    }
    else if (operatorOption === '0' && direction === 'min') {
      console.log(5, operatorOption)
      a = valueContinuous1 / 100 + String.raw`\frac{1}{throughput^1}`
    }
    else if (operatorOption === '0' && direction === 'max') {
      console.log(6, operatorOption)
      a = valueContinuous1 / 100 + String.raw`throughput`
    }
    else if (operatorOption === 'log' && direction === 'min') {
      console.log(7, operatorOption)
      a = valueContinuous1 / 100 + String.raw`\frac{1}{log(throughput)}`
    }
    else if (operatorOption === 'log' && direction === 'max') {
      console.log(8, operatorOption)
      a = valueContinuous1 / 100 + String.raw`log(throughput)`
    }
    else {
      a = valueContinuous1 / 100 + "throughput"
    }
    setEquation(a)
  }, [direction, valueContinuous1, operatorOption])


  const handleOperatorChange = (operatorOption: string) => {
    console.log("opo" + operatorOption)
    setOperatorOption(operatorOption)
  }
  const handelValueTypeChange = (valueType: string) => {
    setValueType(valueType);
  }
  const handleOptionChange = (value: string, _event: React.FormEvent<HTMLSelectElement>) => {
    setOption(value);
  };
  const handelRadioChange = (value, x) => {
    console.log("hrc" + x)
    if (direction === "min") {
      setDirection("max")
    }
    else if (direction === "max") {
      setDirection("min")
    }
  };

  const valueOptions = [
    { value: 'double', label: 'double', disabled: false },
    { value: 'float', label: 'float' }
  ]
  const options = [
    { value: 'prometheus', label: 'prometheus', disabled: false },
    { value: 'B', label: 'B', disabled: false },
    { value: 'C', label: 'C', disabled: false },
  ];
  const operatorOptions = [
    { value: '0', label: 'none', disabled: false },
    { value: 'log', label: 'log', disabled: false },
    { value: '2', label: 'square', disabled: false },
    { value: '0.5', label: 'square root', disabled: false },

  ]
  const config = {
    loader: { load: ["input/asciimath"] }
  };
  // let text = "2";
  // let result = text.sup();
  // let value = valueContinuous1 + result
  // const equat = "$(throughput)^{operatorOption} / bhanvi$";

  return (
    <>
      <Form isWidthLimited id="form_throughput" onSubmit={(e) => {
        e.preventDefault();
      }}>
        <Grid>
          <TextContent>
            <Text component={TextVariants.h3}>
              Function Variable :  Throughput
              <br />

            </Text>
          </TextContent>
          <FormGroup>
            {editing ? (<button
              className="pf-c-button pf-m-plain "
              type="button"

              id="inline-edit-toggle-example-edit-button"
              aria-label="Edit"
              onClick={() => setEditing(false)}
              aria-labelledby="inline-edit-toggle-example-edit-button inline-edit-toggle-example-label"
            > <SaveIcon color="blue" /> &nbsp;
              Save
            </button>)
              :
              (<button
                className="pf-c-button pf-m-plain "
                type="button"
                id="inline-edit-toggle-example-edit-button"
                aria-label="Edit"
                onClick={() => setEditing(true)}
                aria-labelledby="inline-edit-toggle-example-edit-button inline-edit-toggle-example-label"
              > <PencilAltIcon color="blue" /> &nbsp;
                Edit
              </button>)}

          </FormGroup>
          <FormGroup>
            <div className="pf-u-disabled-color-100">
              {/* <MathJaxContext config={config}>
             <Text>Equation : <MathJax dynamic > {equation}</MathJax>
              </Text>
            </MathJaxContext> */}

              <MathComponent tex={equation} />
            </div>
          </FormGroup>

          <FormGroup
            label="Weightage"
            isRequired
            fieldId="horizontal-form-name"

          >
            <Slider
              value={valueContinuous1}
              isInputVisible
              inputValue={inputValueContinuous1}
              inputLabel="%"
              onChange={onChangeContinuous1}
              isDisabled={!editing}
            />
          </FormGroup>
          <FormGroup
            label="Operator"
            isRequired
            fieldId="horizontal-form-name"
          >

            <FormSelect
              value={operatorOption}
              onChange={handleOperatorChange}
              isDisabled={!editing}
              aria-label="operator options"

            >
              {operatorOptions.map((option, index) => (
                <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
              ))}
            </FormSelect>
          </FormGroup>

          <FormGroup label="Query" isRequired fieldId="horizontal-form-email">
            <TextInput
              value={query}
              isRequired
              name="horizontal-form-query"
              onChange={handleQueryChange}
              isDisabled={!editing}
              aria-label="query throughput"
            />
          </FormGroup>

          <FormGroup label="Data source" fieldId="horizontal-form-title">
            <FormSelect
              value={option}
              onChange={handleOptionChange}
              isDisabled={!editing}
              aria-label="options"
            >
              {options.map((option, index) => (
                <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
              ))}
            </FormSelect>
          </FormGroup>

          <FormGroup label="Value Type" fieldId="horizontal-form-title">
            <FormSelect
              value={valueType}
              onChange={handelValueTypeChange}
              isDisabled={!editing}
              aria-label="value type"
            >
              {valueOptions.map((option, index) => (
                <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
              ))}
            </FormSelect>
          </FormGroup>


          <FormGroup role="radiogroup" isStack fieldId="horizontal-form-radio-group" hasNoPaddingTop label="Direction"  >
            <Radio name="horizontal-inline-radio" label="Maximize" id="horizontal-inline-radio-01" onChange={handelRadioChange} isChecked={direction === 'max'} isDisabled={!editing} />
            <Radio name="horizontal-inline-radio" label="Minimize" id="horizontal-inline-radio-02" onChange={handelRadioChange} isChecked={direction === 'min'} isDisabled={!editing} />
          </FormGroup>
        </Grid>
      </Form>
      {console.log("what is" + props.data.THequation)}
    </>
  )
};
export { Throughput_details };

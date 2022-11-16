import React from 'react';
import { CheckIcon, Select } from 'native-base';
import { Procedures } from '../../hooks/useFieldsAutoComplete';

type Props = {
    setFieldValue: (procedure:string, itemValue:string) => void
}

export const CustomSelect: React.FC<Props> = ({ setFieldValue }) => {
  return (
    <Select
      selectedValue={''}
      minWidth="200"
      accessibilityLabel="Выбрать процедуру"
      placeholder="Выбрать процедуру"
      _selectedItem={{
        bg: 'teal.600',
        endIcon: <CheckIcon
          size="5"
        />
      }}
      mt={1}
      onValueChange={itemValue => setFieldValue('procedure',itemValue)}>
      <Select.Item
        label={Procedures.Correction}
        value={Procedures.Correction} />
      <Select.Item
        label={Procedures.BotoxByZone}
        value={Procedures.BotoxByZone} />
      <Select.Item
        label={Procedures.Lips}
        value={Procedures.Lips} />
      <Select.Item
        label={Procedures.Chin}
        value={Procedures.Chin} />
      <Select.Item
        label={Procedures.NasalFold}
        value={Procedures.NasalFold} />
      <Select.Item
        label={Procedures.Model}
        value={Procedures.Model} />
      <Select.Item
        label={Procedures.NasolacrimalSulcus}
        value={Procedures.NasolacrimalSulcus} />
      <Select.Item
        label={Procedures.Cheekbone}
        value={Procedures.Cheekbone} />
      <Select.Item
        label={Procedures.Bio}
        value={Procedures.Bio} />
      <Select.Item
        label={Procedures.BotoxFullFace}
        value={Procedures.BotoxFullFace} />
    </Select>
  );
};
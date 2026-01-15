import { Button, Input } from 'antd'
import s from './SearchForm.module.css'

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  inputValue: string
  setInputValue: (value: string) => void
  onClear: () => void
}

export const SearchForm = ({ handleSubmit, inputValue, setInputValue, onClear }: Props) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (!e.target.value) {
      onClear()
    }
  }
  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <Input
        value={inputValue}
        onChange={onChangeHandler}
        placeholder="Search for a movie"
        allowClear
        className={s.input}
      />
      <Button disabled={!inputValue.trim()} htmlType="submit">
        Search
      </Button>
    </form>
  )
}

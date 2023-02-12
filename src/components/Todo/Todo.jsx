import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ text, counter, id, deleteTodo, editTodo }) => {
  const onClickDel = id => {
    deleteTodo(id);
  };
  const onClickEdit = id => {
    editTodo(id);

  };
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{counter}
      </Text>
      <Text>{text}</Text>
      <DeleteButton type="button" onClick={() => onClickDel(id)}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>

      <EditButton type="button" onClick={() => onClickEdit(id)}>
        <RiEdit2Line size={26} />
      </EditButton>
    </TodoWrapper>
  );
};

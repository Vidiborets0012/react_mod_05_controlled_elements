import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";
import SortFilter from "../SortFilter/SortFilter";
import TaskList from "../TaskList/TaskList";
import Modal from "../Modal/Modal";
import TaskForm from "../TaskForm/TaskForm";
import { getTasks } from "../../services/taskServices";
import css from "./App.module.css";
import type { SortOrder } from "../../types/task";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [search, setSearch] = useState("");

  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", search, sortOrder],
    queryFn: () => getTasks(search, sortOrder),
  });

  const debounceSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    1000
  );

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOrder(event.target.value as SortOrder);
  };

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   onSearch(event.target.value);
  //   // console.log(event.target.value);
  // };

  return (
    <div className={css.container}>
      <header className={css.header}>
        {/* <input type="text" defaultValue={search} onChange={debounceSearch} /> */}
        <SearchBox search={search} onChange={debounceSearch} />
        <strong>{sortOrder}</strong>
        <SortFilter sortOrder={sortOrder} onChange={handleSortOrderChange} />
        <button className={css.createButton} onClick={openModal}>
          Create task
        </button>
      </header>
      {isLoading && <strong className={css.loading}>Loading tasks...</strong>}
      {data && !isLoading && <TaskList tasks={data} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <TaskForm onSuccess={closeModal} />
        </Modal>
      )}
    </div>
  );
}

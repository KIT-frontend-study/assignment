"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";
import { PRIORITIES, priorityOrder } from "./constants/priorities";

export default function TodoPage() {
    const [todos, setTodos] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [input, setInput] = useState('');
    const [priority, setPriority] = useState('low');
    const [filterDone, setFilterDone] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const router = useRouter();

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('todos');
        if (saved) setTodos(JSON.parse(saved));
        setLoaded(true);
    }, []);

    // Save to localStorage only after initial load
    useEffect(() => {
        if (!loaded) return;
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos, loaded]);

    function sortTodos(todoArray) {
        return [...todoArray].sort((a, b) => {
            if (a.done !== b.done) return a.done - b.done;
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }

    function handleAdd() {
        if (input.trim() === '') return;
        const newTodo = { id: crypto.randomUUID(), text: input, done: false, priority, createdAt: Date.now() };
        setTodos([...todos, newTodo]);
        setInput('');
    }

    function handleDelete(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    function handleToggle(id) {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo));
    }

    function handleEdit(id, newText, newPriority) {
        setTodos(todos.map((todo) =>
            todo.id === id ? {
                ...todo,
                ...(newText !== undefined ? { text: newText } : {}),
                ...(newPriority ? { priority: newPriority } : {}),
            } : todo
        ));
    }

    const filteredTodos = todos
        .filter((todo) => filterDone === 'all' || (filterDone === 'done' ? todo.done : !todo.done))
        .filter((todo) => filterPriority === 'all' || todo.priority === filterPriority);

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <h1 className="text-3xl font-bold">Todo 앱</h1>

            <div className="flex items-center gap-2 mt-3">
                <input type="text"
                    className="border rounded-full px-4 py-1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    placeholder="할 일을 입력하세요"/>
                <select
                    className="border rounded-full px-3 py-1"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    {PRIORITIES.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                </select>
                <button className="border rounded-full px-4 py-1" onClick={handleAdd}>추가</button>
            </div>

            <TodoFilter
                filterDone={filterDone}
                setFilterDone={setFilterDone}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
                onSort={() => setTodos(sortTodos(todos))}
            />

            <div className="w-full max-w-md h-64 overflow-y-auto mt-2">
                {filteredTodos.length === 0 ? (
                    <p className="text-gray-500 text-center">할 일이 없습니다.</p>
                ) : (
                    <ul className="flex flex-col gap-2">
                        {filteredTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onDelete={handleDelete}
                                onToggle={handleToggle}
                                onEdit={handleEdit}
                            />
                        ))}
                    </ul>
                )}
            </div>

            <p className="mt-2">총 {todos.length}개 중에 {todos.filter(todo => todo.done).length}개 완료하셨습니다.</p>
            <div className="border rounded-full px-4 py-1 mt-3 text-lg cursor-pointer" onClick={() => router.back()}>
                뒤로 가기
            </div>
        </div>
    );
}
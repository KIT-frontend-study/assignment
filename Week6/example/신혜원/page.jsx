'use client';
import { useState } from "react";

// 3. TodoItem 컴포넌트 분리 - props로 데이터와 함수를 받음
function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li className="flex justify-between items-center border rounded-xl px-4 py-2 mb-2">
            <div className="flex items-center gap-2">
                {/* 1. 체크박스 추가 */}
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="w-4 h-4 cursor-pointer"
                />
                {/* 체크되면 취소선 + 회색 처리 */}
                <span className={todo.completed ? "line-through text-gray-400" : ""}>
                    {todo.text}
                </span>
            </div>
            <button
                onClick={() => onDelete(todo.id)}
                className="border rounded-lg px-2 py-1 text-red-500 hover:bg-red-50"
            >
                삭제
            </button>
        </li>
    );
}

export default function TodoPage() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);

    function handleAdd() {
        if (input.trim() === "") return;

        const newTodo = {
            id: Date.now(),
            text: input,
            completed: false, // 1. completed 속성 추가
        };
        setTodos([...todos, newTodo]);
        setInput("");
    }

    function handleDelete(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    // 1. 완료 토글 - map으로 해당 id만 새 객체로 교체
    function handleToggle(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    // 2. 완료 개수 - 상태 없이 todos에서 바로 계산 (렌더링마다 자동 갱신됨)
    const completedCount = todos.filter((todo) => todo.completed).length;

    return (
        <div className="flex flex-col items-center p-10">
            <h1 className="text-3xl font-bold mb-6">Todo 앱</h1>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    className="border rounded-xl px-2 py-1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="할 일을 입력하세요"
                />
                <button
                    onClick={handleAdd}
                    className="border rounded-xl px-4 py-1 bg-blue-500 text-white hover:bg-blue-600"
                >
                    추가
                </button>
            </div>

            {/* 목록 표시 섹션 */}
            {todos.length === 0 ? (
                <p className="text-gray-500 mt-4">할 일이 없습니다.</p>
            ) : (
                <ul className="mt-4 w-full max-w-md">
                    {todos.map((todo) => (
                        // 3. props로 todo 데이터 + 토글/삭제 함수 전달
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                        />
                    ))}
                </ul>
            )}

            <p className="mt-6 text-sm text-gray-600">
                <strong>{completedCount}</strong> / {todos.length}개 완료
            </p>
        </div>
    );
}
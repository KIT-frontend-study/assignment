"use client";

import { useState, useEffect, useRef } from "react";

const PRIORITIES = [
    { value: "high", label: "High", color: "bg-red-400" },
    { value: "medium", label: "Medium", color: "bg-yellow-400" },
    { value: "low", label: "Low", color: "bg-green-400" },
];

function getPriority(value) {
    return PRIORITIES.find((p) => p.value === value) ?? PRIORITIES[2];
}

export default function TodoItem({ todo, onDelete, onToggle, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const priority = getPriority(todo.priority);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleEditSubmit() {
        if (editText.trim() !== '') onEdit(todo.id, editText.trim());
        setIsEditing(false);
    }

    return (
        <li className="border rounded-full px-4 py-2 flex justify-between items-center w-full gap-2">
            <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />

            {isEditing ? (
                <input
                    autoFocus
                    className="flex-1 border-b outline-none px-1"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleEditSubmit();
                        if (e.key === 'Escape') setIsEditing(false);
                    }}
                    onBlur={handleEditSubmit}
                />
            ) : (
                <span
                    className={`flex-1 cursor-pointer select-none ${todo.done ? "line-through text-gray-400" : ""}`}
                    onClick={() => onToggle(todo.id)}
                    onDoubleClick={() => setIsEditing(true)}
                >
                    {todo.text}
                </span>
            )}

            <div className="relative" ref={dropdownRef}>
                <button
                    className={`w-4 h-4 rounded-sm ${priority.color} cursor-pointer`}
                    onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                    <div className="absolute right-0 top-5 flex flex-col bg-white border rounded-lg shadow-md z-10 overflow-hidden">
                        {PRIORITIES.map((p) => (
                            <button
                                key={p.value}
                                className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 text-sm whitespace-nowrap"
                                onClick={() => {
                                    onEdit(todo.id, undefined, p.value);
                                    setShowDropdown(false);
                                }}
                            >
                                <div className={`w-3 h-3 rounded-sm ${p.color}`} />
                                {p.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button className="border rounded-full px-3 py-1 text-sm" onClick={() => onDelete(todo.id)}>
                삭제
            </button>
        </li>
    );
}
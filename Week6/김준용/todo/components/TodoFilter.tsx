const PRIORITIES = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
];

export default function TodoFilter({ filterDone, setFilterDone, filterPriority, setFilterPriority, onSort }) {
    return (
        <div className="flex gap-3 mt-3 text-sm">
            <select
                className="border rounded-full px-3 py-1"
                value={filterDone}
                onChange={(e) => setFilterDone(e.target.value)}
            >
                <option value="all">전체</option>
                <option value="active">미완료</option>
                <option value="done">완료</option>
            </select>

            <select
                className="border rounded-full px-3 py-1"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
            >
                <option value="all">모든 우선순위</option>
                {PRIORITIES.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                ))}
            </select>

            <button className="border rounded-full px-3 py-1 text-sm" onClick={onSort}>
                정렬
            </button>
        </div>
    );
}
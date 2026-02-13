import { Plus, Trash2 } from "lucide-react";

export function ActivitiesTab({ activities, setActivities }) {
  const addActivity = () => {
    setActivities([
      ...activities,
      {
        id: Date.now(),
        title: "",
        description: "",
        display_order: activities.length,
      },
    ]);
  };

  const updateActivity = (id, field, value) => {
    setActivities(
      activities.map((act) =>
        act.id === id ? { ...act, [field]: value } : act,
      ),
    );
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter((act) => act.id !== id));
  };

  return (
    <div className="space-y-4">
      {activities.map((act) => (
        <div
          key={act.id}
          className="p-5 bg-white border border-black/10 rounded space-y-3"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Activity Entry
            </h3>
            <button
              onClick={() => deleteActivity(act.id)}
              className="text-black/40 hover:text-black transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <input
            placeholder="Activity Title"
            value={act.title}
            onChange={(e) => updateActivity(act.id, "title", e.target.value)}
            className="w-full bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
          />
          <textarea
            placeholder="Description"
            rows={3}
            value={act.description}
            onChange={(e) =>
              updateActivity(act.id, "description", e.target.value)
            }
            className="w-full bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 resize-none transition-colors"
          />
        </div>
      ))}

      <button
        onClick={addActivity}
        className="w-full py-3 border border-dashed border-black/20 rounded flex items-center justify-center gap-2 hover:border-black/40 hover:bg-black/[0.02] transition-all text-sm font-medium text-black/60"
      >
        <Plus size={16} /> Add Activity
      </button>
    </div>
  );
}
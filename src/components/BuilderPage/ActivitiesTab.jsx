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
    <div className="space-y-6">
      {activities.map((act) => (
        <div
          key={act.id}
          className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Activity Entry</h3>
            <button
              onClick={() => deleteActivity(act.id)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <input
            placeholder="Activity Title"
            value={act.title}
            onChange={(e) => updateActivity(act.id, "title", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
          />
          <textarea
            placeholder="Description"
            rows={3}
            value={act.description}
            onChange={(e) =>
              updateActivity(act.id, "description", e.target.value)
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40 resize-none"
          />
        </div>
      ))}

      <button
        onClick={addActivity}
        className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center gap-2 hover:border-white/40 transition-all"
      >
        <Plus size={20} /> Add Activity
      </button>
    </div>
  );
}

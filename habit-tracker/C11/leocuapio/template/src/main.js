console.log("test")

let habits = JSON.parse(localStorage.getItem('habits') || '[]');

const form = document.getElementById('habit_form')

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('habit_form');
    renderHabits(habits);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(event.target)
        const editId = Number(form.dataset.editId);
        if (editId) {
            const hab = habits.find(h => h.id === editId);
            if (hab) {
                hab.name = data.get('habit_name');
                hab.targetStreak = data.get('target_streak');
            };
            delete form.dataset.editId;
        }else {
            const habit = {
                id: Date.now(),
                name: data.get('habit_name'),
                targetStreak: Number(data.get('target_streak')),
                currentStreak: 0,
                status: "Not Completed",
                history: []
            };
            habits.push(habit)
        };


        savedHabits()
        console.log(habits)
        renderHabits(habits)
        form.reset()
        const modal = bootstrap.Modal.getInstance(document.getElementById('habitModal'))
        modal.hide()
    })
})

let saved_habits = JSON.parse(localStorage.getItem('habits'))
console.log(saved_habits)

const renderHabits = (habits) => {
    const habitList = document.getElementById('habit_cards')
    habitList.innerHTML = ''; 
    for (let i = 0; i < habits.length; i++) {
        const habit = habits[i]
        // const li = document.createElement('li')
        // li.textContent = `${habit.name} Target Streak: ${habit.targetStreak}`
        // habitList.appendChild(li)
        // Card Integration below
        const col = document.createElement('div')
        col.className = "col-md-4 mb-3"; // <-- 3 per row
        col.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${habit.name}</h5>
                    <p class="card-text">Target Streak: ${habit.targetStreak}</p>
                    <p class="card-text">Current Streak: ${habit.currentStreak}</p>
                    <p class="card-text">Status: ${habit.status}</p>
                    <button class="btn btn-success complete-btn" data-id="${habit.id}">Done</button>
                    <button class="btn btn-primary edit-btn" data-id="${habit.id}">Edit</button>
                    <button class="btn btn-danger delete-btn" data-id="${habit.id}">Remove</button>
                </div>
            </div>
        `;
        habitList.appendChild(col);

    }
}
renderHabits(habits);

document.getElementById("deleteBtn").addEventListener("click", () => {
    const Habit_To_Del = prompt("Enter the habit you want to delete: ") 
    if (Habit_To_Del) {
        habits = habits.filter(h => h.name !== Habit_To_Del.trim())
        savedHabits()
        renderHabits(habits)
    }
})

function savedHabits() {
    localStorage.setItem('habits', JSON.stringify(habits))
}

// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('habit_form');
//     const habitCards = document.getElementById('habit_cards');

//     form.addEventListener('submit', (event) => {

//         const name = document.getElementById("habit_name").value.trim()
//         const streak = document.getElementById("target_streak").value.trim()
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("complete-btn")) {
            const id = Number(event.target.dataset.id);
            const hab = habits.find(h => h.id === id);
            if (hab) {
                const today = new Date().toISOString().split("T")[0];
                if (hab.history.includes(today)) {
                    alert("You already completed this habit today!");
                    return;
                }
                hab.history.push(today);
                hab.currentStreak += 1;
                if (hab.currentStreak >= hab.targetStreak) {
                    hab.status = "Completed"
                };
                savedHabits();
                renderHabits(habits);
            }
        }
    });

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const id = Number(event.target.dataset.id);
            habits = habits.filter(h => h.id !== id)
            savedHabits()
            renderHabits(habits)
        }
    });

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-btn")) {
            const id = Number(event.target.dataset.id);
            const habit = habits.find(h => h.id === id);  
            if (habit) {

            document.getElementById("habit_name").value = habit.name;
            document.getElementById("target_streak").value = habit.targetStreak;

            form.dataset.editId = id;

            const modalEl = document.getElementById("myModal");
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
            }
        }
    });
});

const renderlongeststreak = (habits) => { 
    const streaks = Object.values(habits).map(h => h.currentStreak)
    const maxstreak = Math.max(...streaks)
    const largest_streak = document.getElementById("longest_streak")
    const lol = document.createElement('div')
    lol.innerHTML = `
            <p>Longest Streak: ${maxstreak}</p>
        `;
        largest_streak.appendChild(lol);
};
renderlongeststreak(habits);
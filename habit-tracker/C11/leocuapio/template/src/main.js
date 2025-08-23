console.log("test")

let habits = JSON.parse(localStorage.getItem('habits') || '[]');

const form = document.getElementById('habit_form')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = new FormData(event.target)

    const habit = {
        name: data.get('habit_name'),
        targetStreak: data.get('target_streak')
    }

    habits.push(habit)
    savedHabits()
    console.log(habits)
    renderHabits(habits)
})

let saved_habits = JSON.parse(localStorage.getItem('habits'))
console.log(saved_habits)

const renderHabits = (habits) => {
    const habitList = document.getElementById('habit_list')
    habitList.innerHTML = ''; 
    for (let i = 0; i < habits.length; i++) {
        const habit = habits[i]
        const li = document.createElement('li')
        li.textContent = `${habit.name} Target Streak: ${habit.targetStreak}`
        habitList.appendChild(li)
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

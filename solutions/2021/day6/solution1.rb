states = File.read(File.join(File.dirname(__FILE__), 'input.txt')).split(',').map { |state| [state.to_i, 1] }

80.times do
  new_fish = 0

  states.each_with_index do |_, index|
    if states[index][0] == 0
      states[index][0] = 6
      new_fish += states[index][1]
    else
      states[index][0] -= 1
    end
  end

  states << [8, new_fish]
end

puts states.sum(&:last)
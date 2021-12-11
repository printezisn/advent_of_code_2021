instructions = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map do |line|
  instruction, value = line.split
  [instruction, value.to_i]
end

accumulator = 0
index = 0
executed_instructions = {}

while index < instructions.size
  if executed_instructions[index]
    puts accumulator
    break
  end

  executed_instructions[index] = true

  case instructions[index][0]
  when 'acc'
    accumulator += instructions[index][1]
    index += 1
  when 'jmp'
    index += instructions[index][1]
    index = 0 if index < 0
  else
    index += 1
  end
end
def run(instructions)
  accumulator = 0
  index = 0
  executed_instructions = {}

  while index < instructions.size
    return nil if executed_instructions[index]
  
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

  accumulator
end

instructions = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map do |line|
  instruction, value = line.split
  [instruction, value.to_i]
end

instructions.each_with_index do |instruction, index|
  next if instruction[0] == 'acc'

  alternative = instructions.dup
  alternative[index] = [instruction[0] == 'nop' ? 'jmp' : 'nop', alternative[index][1]]

  accumulator = run(alternative)
  if accumulator
    puts accumulator
    break
  end
end
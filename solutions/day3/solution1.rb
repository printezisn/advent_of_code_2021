popularities = []

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |digits|
  digits.chomp.reverse.chars.each_with_index do |digit, index|
    popularities[index] ||= 0
    popularities[index] += (digit == '1' ? 1 : -1)
  end
end

gamma = 0
epsilon = 0
popularities.each_with_index do |popularity, index|
  gamma |= (1 << index) if popularity >= 0
  epsilon |= (1 << index) if popularity < 0
end

puts gamma * epsilon
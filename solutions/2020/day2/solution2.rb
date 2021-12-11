total = 0

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  index1, index2, letter, str = /(\d+)-(\d+) (\w): (\w+)/.match(line).captures

  occurences = 0
  occurences += 1 if str[index1.to_i - 1] == letter
  occurences += 1 if str[index2.to_i - 1] == letter

  total += 1 if occurences == 1
end

puts total
total = 0

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  min, max, letter, str = /(\d+)-(\d+) (\w): (\w+)/.match(line).captures
  occurences = str.chars.count { |c| c == letter }

  total += 1 if occurences >= min.to_i && occurences <= max.to_i
end

puts total
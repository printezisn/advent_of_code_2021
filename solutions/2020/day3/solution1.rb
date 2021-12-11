total = 0
map = []
File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line { |line| map << line.chomp.chars }

(0...map.size).each do |row|
  col = (row * 3) % map[row].size
  total += 1 if map[row][col] == '#'
end

puts total
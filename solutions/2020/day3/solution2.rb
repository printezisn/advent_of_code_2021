map = []
File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line { |line| map << line.chomp.chars }

totals = []

[[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]].each do |col_step, row_step|
  total = 0

  (0...map.size).step(row_step).each do |row|
    col = (row * col_step / row_step) % map[row].size
    total += 1 if map[row][col] == '#'
  end

  totals << total
end

puts totals.reduce(&:*)
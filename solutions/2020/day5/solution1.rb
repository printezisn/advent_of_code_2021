max_seat_id = 0

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  min_row = 0
  max_row = 127
  min_col = 0
  max_col = 7

  line.chomp.chars.each do |char|
    case char
    when 'F'
      max_row = (max_row + min_row) / 2
    when 'B'
      min_row = (max_row + min_row).fdiv(2).ceil
    when 'L'
      max_col = (max_col + min_col) / 2
    else
      min_col = (max_col + min_col).fdiv(2).ceil
    end
  end

  max_seat_id = [max_seat_id, min_row * 8 + min_col].max
end

puts max_seat_id
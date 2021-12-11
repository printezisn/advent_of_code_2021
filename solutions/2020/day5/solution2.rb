max_seat_id = 0
seats = {}

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

  seat_id = min_row * 8 + min_col
  seats[seat_id] = true

  max_seat_id = [max_seat_id, seat_id].max
end

(1..max_seat_id).each do |seat_id|
  if !seats[seat_id] && seats[seat_id - 1] && seats[seat_id + 1]
    puts seat_id
    break
  end
end